package com.company.jwr_monitoring.plc;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.eclipse.milo.opcua.stack.core.types.builtin.DataValue;
import org.eclipse.milo.opcua.stack.core.types.builtin.NodeId;
import org.eclipse.milo.opcua.stack.core.types.enumerated.TimestampsToReturn;
import org.springframework.stereotype.Service;

import com.company.jwr_monitoring.dto.TagLog.TagLogDto;
import com.company.jwr_monitoring.entity.TagMaster;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpcUaReadService {

    private final OpcUaConnectionService opcUaConnectionService;

    public Double readTag(TagMaster tag) {

        try {

            OpcUaClient client = opcUaConnectionService.getClient(tag.getIpAddress());

            NodeId nodeId = NodeId.parse(tag.getNodeId());

            DataValue dataValue = client.readValue(
                    0.0,
                    TimestampsToReturn.Both,
                    nodeId);

            Object value = dataValue.getValue().getValue();

            return convertToDouble(value);

        } catch (Exception ex) {

            log.error(
                    "Error reading OPC UA Tag [{}] NodeId [{}]",
                    tag.getTagName(),
                    tag.getNodeId(),
                    ex);

            return null;
        }
    }

    private Double convertToDouble(Object value) {

        if (value == null) {
            return null;
        }

        if (value instanceof Number number) {
            return number.doubleValue();
        }

        if (value instanceof Boolean bool) {
            return bool ? 1.0 : 0.0;
        }

        try {
            return Double.parseDouble(value.toString());
        } catch (Exception ex) {
            return null;
        }
    }

    public TagLogDto readTagLog(TagMaster tag) {

        Double value = readTag(tag);

        return TagLogDto.builder()
                .tagId(tag.getId())
                .tagName(tag.getTagName())
                .value(value)
                .timestamp(LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES))
                .build();
    }
}